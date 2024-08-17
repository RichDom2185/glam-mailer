import json
from collections import defaultdict
from time import sleep

import requests
from bs4 import BeautifulSoup

# Base URL for the Tailwind CSS docs
base_url = 'https://tailwindcss.com'

# Load the main page
response = requests.get(f'{base_url}/docs/installation')
soup = BeautifulSoup(response.content, 'html.parser')

# Get all the `ul`s matching the given query selector
# In BeautifulSoup, we'll navigate manually as it doesn't directly support complex CSS selectors like this
ul_elements = soup.select(
    'nav.relative > ul > li.mt-12 + li + li + li + li:not(:last-child) > ul')

# Dictionary to store the `href` and `innerHTML`
links_dict = {}

# (3) Iterate through each `ul > li > a` and store the `href` and `innerHTML`
for ul in ul_elements:
    for a in ul.select('li > a'):
        href = a.get('href')
        inner_html = a.text.strip()
        if href:
            links_dict[href] = inner_html

print(f'Found {len(links_dict)} links')
with open('hyperlinks.json', 'w') as f:
    json.dump(links_dict, f, indent=2)
    print('Persisted links to file!')

# Dictionary to store the `href` and the table data
table_data_dict = defaultdict(dict)

with open('classes.json', 'r') as f:
    persisted = json.load(f)

# (4) For each `href`, visit the page and get the first `table > tbody`
for href, description in links_dict.items():
    if href in persisted:
        print(f'Skipping previously scraped {href} ({description})')
        table_data_dict[href] = persisted[href]
        continue

    print(f'Visiting {href} ({description})')
    page_url = f'{base_url}{href}'
    page_response = requests.get(page_url)
    page_soup = BeautifulSoup(page_response.content, 'html.parser')

    tbody = page_soup.select_one('table > tbody')
    if not tbody:
        print(f'Warning: No <tbody> found for {href}')
        continue

    # (5) Iterate over `tr` rows, ensuring there are exactly 2 `td` cells
    for tr in tbody.select('tr'):
        td_elements = tr.select('td')
        if len(td_elements) != 2:
            print(
                f'Warning: {href} has a row with {len(td_elements)} cells instead of 2.')
            continue
        first_cell = td_elements[0].text.strip()
        second_cell = td_elements[1].text.strip()
        table_data_dict[href][first_cell] = second_cell

    # Persist the data
    with open('classes.json', 'w') as f:
        json.dump(table_data_dict, f, indent=2)
        print(f'Persisted {href} ({description})')

    # Sleep for 1 second to avoid rate limiting
    sleep(1)


# Displaying the collected data
for href, table_data in table_data_dict.items():
    print(f'\nData for {href}:')
    for data in table_data:
        print(data)
