import React from "react";
class Api{
     endPoint = () => {
        return `${this.serverLink()}/api/v1`
    }

    serverLink = () => {
        return 'http://127.0.0.1:5000'
    }

    userImagePath = (filename) => {
        return `${this.serverLink()}/uploads/images/users/${filename}`
    }

    productImagePath = (filename) => {
        return `${this.serverLink()}/uploads/images/products/${filename}`
    }

    systemImagePath = (filename) => {
        return `${this.serverLink()}/uploads/images/system/${filename}`
    }
}

export default Api;
