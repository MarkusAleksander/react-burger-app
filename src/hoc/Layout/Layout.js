import React, { Component } from "react";
import Auxillary from "../Auxillary/Auxillary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !this.state.showSideDrawer };
        });
    };

    render() {
        return (
            <Auxillary>
                <Toolbar drawerToggleClicked={this.sideDrawToggleHandler} />
                <SideDrawer
                    closed={this.sideDrawClosedHandler}
                    open={this.state.showSideDrawer}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxillary>
        );
    }
}

export default Layout;
