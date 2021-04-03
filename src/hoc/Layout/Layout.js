import React, { Component } from "react";
import { connect } from "react-redux";

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
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    closed={this.sideDrawClosedHandler}
                    open={this.state.showSideDrawer}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxillary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);
