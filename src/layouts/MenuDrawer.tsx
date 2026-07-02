import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

export const MenuDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer.Root
      placement="start"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Drawer.Trigger asChild>
        <Button
          variant="outline"
          size="xl"
          color="white"
          bg="transparent"
          border="none"
        >
          <IoMdMenu />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header bg="blue.800">
              <Drawer.Title color="white">メニュー</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body p={0} bg="blue.800" onClick={() => setOpen(false)}>
              <Sidebar />
            </Drawer.Body>
            <Drawer.Footer bg="blue.800">
              <Button variant="outline" color="white" onClick={() => setOpen(false)}>
                閉じる
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton color="white" size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
