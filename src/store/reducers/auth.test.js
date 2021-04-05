import reducer from "./auth";

import * as actionTypes from "./../actions/actionTypes";

describe("Auth reducer", () => {

    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            idToken: null,
            localId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        });
    });

    it("should store token upon login", () => {
        expect(reducer({
            idToken: null,
            localId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        }, {type: actionTypes.AUTH_SUCCESS, idToken: "idToken", localId: "localId"})).toEqual({
            idToken: "idToken",
            localId: "localId",
            error: null,
            loading: false,
            authRedirectPath: "/"
        });
    });

});