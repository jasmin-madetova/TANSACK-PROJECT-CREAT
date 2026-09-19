import { AppShell, Burger, Flex, NavLink, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image.png";
import { ROUTES } from "../routes/routes";
import { Profile2User, AlignLeft } from "iconsax-reactjs";

const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    if (opened) toggle();
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Flex align="center" gap="md" ml="lg" h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <img
            src={logo}
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
          <Text fw={700}>CRUD-Tanstack</Text>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <NavLink
            label="Все пользователи"
            leftSection={<Profile2User />}
            active={location.pathname === ROUTES.USERS}
            onClick={() => handleNavigate(ROUTES.USERS)}
            variant="filled"
          />

          <NavLink
            label="Список задач"
            leftSection={<AlignLeft />}
            active={location.pathname === "/todos"}
            onClick={() => handleNavigate("/todos")}
            variant="light"
          />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;