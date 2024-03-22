import { SegmentedControl, SimpleGrid, Tabs } from "@mantine/core";
import React, { useState } from "react";

type Props = {
  data: ReadonlyArray<{
    element: React.ReactNode;
    label: React.ReactNode;
  }>;
};

const ResponsiveBody: React.FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("0");
  return (
    <>
      <SimpleGrid cols={data.length} visibleFrom="md">
        {data.map(({ element }, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </SimpleGrid>
      <Tabs hiddenFrom="md" value={activeTab}>
        <SegmentedControl
          pb={8} // Hardcoding to fix spacing bug
          mb="xs"
          fullWidth
          data={data.map(({ label }, i) => ({ label, value: `${i}` }))}
          onChange={setActiveTab}
        />
        {/* <Tabs.List grow>
          {data.map(({ label }, index) => (
            <Tabs.Tab key={index} value={`${index}`}>
              {label}
            </Tabs.Tab>
          ))}
        </Tabs.List> */}
        {data.map(({ element }, index) => (
          <Tabs.Panel
            h="100%"
            key={index}
            value={`${index}`}
            style={{ flexGrow: 1 }}
          >
            {element}
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};

export default ResponsiveBody;
