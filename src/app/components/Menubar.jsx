"use client";
import * as React from "react";
import { Menubar } from "radix-ui";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
import styles from "./Menubar.module.css";
import { redirect } from "next/navigation";

const RADIO_ITEMS = ["Andy", "Benoît", "Luis"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];

export const MenubarDemo = () => {
  const [checkedSelection, setCheckedSelection] = React.useState([
    CHECK_ITEMS[1],
  ]);
  const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2]);

  function handleNewPostPage() {
    redirect("/user/newPost");
  }

  function handleProfilePage() {
    redirect("/user");
  }

  function handleTimelinePage() {
    redirect("/timeline");
  }

  return (
    <Menubar.Root className={styles.Root}>
      <Menubar.Menu>
        {/* TIMELINE */}
        <Menubar.Trigger
          onClick={handleTimelinePage}
          className={styles.Trigger}
        >
          Timeline
        </Menubar.Trigger>
      </Menubar.Menu>

      <Menubar.Menu>
        {/* NEW */}
        <Menubar.Trigger onClick={handleNewPostPage} className={styles.Trigger}>
          New
        </Menubar.Trigger>
      </Menubar.Menu>

      <Menubar.Menu>
        {/* FRIENDS */}
        <Menubar.Trigger className={styles.Trigger}>Friends</Menubar.Trigger>
      </Menubar.Menu>

      <Menubar.Menu>
        {/* PROFILE */}
        <Menubar.Trigger onClick={handleProfilePage} className={styles.Trigger}>
          Profile
        </Menubar.Trigger>
        <Menubar.Portal>
          {/* <Menubar.Content
            className={styles.Content}
            align="start"
            sideOffset={5}
            alignOffset={-14}
          >
            <Menubar.RadioGroup
              value={radioSelection}
              onValueChange={setRadioSelection}
            >
              {RADIO_ITEMS.map((item) => (
                <Menubar.RadioItem
                  className={`${styles.RadioItem} inset`}
                  key={item}
                  value={item}
                >
                  <Menubar.ItemIndicator className={styles.ItemIndicator}>
                    <DotFilledIcon />
                  </Menubar.ItemIndicator>
                  {item}
                </Menubar.RadioItem>
              ))}
              <Menubar.Separator className={styles.Separator} />
              <Menubar.Item className={`${styles.Item} inset`}>
                Edit…
              </Menubar.Item>
              <Menubar.Separator className={styles.Separator} />
              <Menubar.Item className={`${styles.Item} inset`}>
                Add Profile…
              </Menubar.Item>
            </Menubar.RadioGroup>
          </Menubar.Content> */}
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default MenubarDemo;
