import FireFly from "@hyperledger/firefly-sdk";

const credencials_ff = {
    host:   'http://localhost:5000',
    namespace: 'default'
}

const firefly = new FireFly(credencials_ff);

export default firefly;