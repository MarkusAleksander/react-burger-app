import React, { Component } from "react";

import Order from "../../components/Order/Order";

import axios from "./../../axios";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "./../../store/actions";

import { connect } from "react-redux";

import Spinner from "./../../components/UI/Spinner/Spinner";

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.idToken, this.props.localId);
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map((order) => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.totalPrice}
                    />
                );
            });
        }

        return <div>{orders}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        idToken: state.auth.idToken,
        localId: state.auth.localId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (idToken, localId) => dispatch(actions.fetchOrders(idToken, localId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
