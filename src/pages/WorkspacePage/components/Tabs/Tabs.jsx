/* eslint-disable camelcase */
import React from "react";

import {
  TabList,
  Tabs,
  TabPanels,
  Item,
  View,
  Flex,
  Heading,
} from "@adobe/react-spectrum";
import { Container } from "@nextui-org/react";

import { WelcomeWindow } from "../WelcomeWindow";
import { OverlayTab } from "../Tabs/OverlaySettingsTab";
import { SettingsTab } from "../Tabs/AccountSettingsTab";
import { StatsTab } from "../Tabs/StatsTab";
import { useStore } from "../../../../stores/appStore.js";

export function WorkSpaceTabs() {
  const { user_value } = useStore((state) => state);

  if (user_value && user_value._document == null) {
    return <WelcomeWindow />;
  }

  return (
    <>
      <View
        isHidden={{ M: true, base: true, L: false }}
        height={"88vh"}
        margin={"size-100"}
        borderRadius="large"
        gridArea="content"
      >
        <Container
          css={{
            borderRadius: "$lg",
            backgroundColor: "$accents1",
            marginLeft: "$10",
            height: "99%",
            width: "100%",
          }}
        >
          <Flex>
            <Tabs orientation="horizontal">
              <TabList>
                <Item key="item1">
                  <Heading level={4}>Stats</Heading>
                </Item>
                <Item key="item2">
                  <Heading level={4}>Overlay</Heading>
                </Item>
                <Item key="item3">
                  <Heading level={4}>Settings</Heading>
                </Item>
              </TabList>
              <TabPanels>
                <Item key="item1">
                  <StatsTab />
                </Item>
                <Item key="item2">
                  <OverlayTab />
                </Item>

                <Item key="item3">
                  <SettingsTab />
                </Item>
              </TabPanels>
            </Tabs>
          </Flex>
        </Container>
      </View>
    </>
  );
}
