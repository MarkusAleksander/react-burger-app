import React, { Component } from "react";

import {connect} from "react-redux";

import Auxillary from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actionTypes from "./../../store/actions";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios";



class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        // axios
        //     .get(
        //         "https://react-burger-app-200c6.firebaseio.com/ingredients.json"
        //     )
        //     .then((response) => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch((error) => {
        //         this.setState({ error: true });
        //     });
    }

    updatePurchaseState = () => {
        const sum = Object.keys(this.props.ingredients)
            .map((igKey) => {
                return this.props.ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        // this.setState({
            return sum > 0;
        // });
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients,
        };

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? (
            <p>Ingredients can't be loaded</p>
        ) : (
            <Spinner />
        );
        if (this.props.ingredients != null) {
            burger = (
                <Auxillary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                    />
                </Auxillary>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.totalPrice.toFixed(2)}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxillary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
        onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
