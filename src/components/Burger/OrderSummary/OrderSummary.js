import React, { Component } from "react";
import Auxillary from "../../../hoc/Auxillary/Auxillary";
import Button from "../../UI/Button/Button";

// * this could be a functional component
class OrderSummary extends Component {
    componentWillUpdate() {
        console.log("[Order summary will update]");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            (igKey) => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: "capitalize" }}>
                            {igKey}
                        </span>
                        : {this.props.ingredients[igKey]}
                    </li>
                );
            }
        );

        return (
            <Auxillary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p>
                    <strong>Total price: £{this.props.price}</strong>
                </p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
                    CANCEL
                </Button>
                <Button
                    btnType="Success"
                    clicked={this.props.purchaseContinued}
                >
                    CONTINUE
                </Button>
            </Auxillary>
        );
    }
}

export default OrderSummary;
