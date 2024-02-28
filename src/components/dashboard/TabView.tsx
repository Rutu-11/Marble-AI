import React, { useEffect, useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";

type TTabViewProps = {
    tabs: TTab[];
};

export const TabView = ({ tabs }: TTabViewProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [Tabs, setTabs] = useState<TTab[]>([]); 
    useEffect(()=>{
        setTabs(tabs)
    },[tabs])
    // console.log('TabView',Tabs)
    return (
        <div className="mx-auto py-4  border rounded-lg shadow-md ">
            <div className="tabs">
                {Tabs?.map((tab: TTab, index: number) => (
                    <TabItem
                        key={tab?.id}
                        label={tab?.label}
                        isActive={index === activeTab}
                        clickHandler={() => setActiveTab(index)}
                    />
                ))}
            </div>
            <div className="mx-auto">
                {tabs?.map((tab: TTab, index: number) => (
                    <TabPanel key={tab?.id} isActive={index === activeTab}>
                        {tab?.content}
                    </TabPanel>
                ))}
            </div>
        </div>
    );
};
