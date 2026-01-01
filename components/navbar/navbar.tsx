import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { MenubarTrigger } from "@radix-ui/react-menubar";

export default function Navbar() {
  return (
    <div className='flex flex-row'>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
