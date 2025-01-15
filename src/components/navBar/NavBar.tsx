import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
interface Props {
    window?: () => Window;
    children?: React.ReactElement<unknown>;
}

const drawerWidth = 240;
const navItems = ["首頁", "作品集", "品牌故事", "聯絡我們"];

function HideOnScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children ?? <div />}
        </Slide>
    );
}

export default function DrawerHideAppBar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                茶先 | chaxien
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }}>
                            <ListItemText
                                sx={{ color: "#000" }}
                                primary={item}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar
                    component="nav"
                    sx={{
                        backdropFilter: "blur(10px)", // 毛玻璃效果
                        backgroundColor: "rgba(0, 0, 0, 0.2)", // 半透明背景
                        boxShadow: "none", // 可選：移除陰影
                        color: "#fff", // 可選：調整文字顏色
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="success"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: { sm: "none" },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            茶先 | chaxien
                        </Typography>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{ color: "#fff" }}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Toolbar />
            <Container></Container>
        </React.Fragment>
    );
}
