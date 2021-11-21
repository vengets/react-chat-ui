import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

import React from 'React';

import { Container, Row, Col, FormInput, Button } from "shards-react";

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

const GET_MESSAGES = gql`
query {
  messages {
    id,
    content,
    user
  }
}`;

const Messages = ({user}) => {
    const {data} = useQuery(GET_MESSAGES);
    if(!data) {
        return null;
    }
    return (<>
        {data.messages.map(({id, user: messageUser, content}) => (
            <div style={{
                display: "flex",
                justifyContent: user === messageUser ? "flex-end" : "flex-start",
                paddingBottom: "1em"
            }}>
                {user !== messageUser && (
                    <div
                        style={{
                            height: 30,
                            width: 40,
                            marginRight: "0.5em",
                            border: "2px solid #e5e6ea",
                            borderRadius: 30,
                            textAlign: "center",
                            fontSize: "18pt",
                            paddingTop: 5,
                        }}
                        >
                        {messageUser.slice(0,2).toUpperCase()}
                    </div>
                )}

                <div style={{
                    background: user === messageUser ? "#58bf56" : "#e5e6ea",
                    color: user === messageUser ? "white" : "black",
                    padding: "1em",
                    borderRadius: "1em",
                    maxWidth: "60%"
                }}>
                    {content}
                </div>
            </div>
        ))};

        </>);
}

const Chat = () => {
    // const [state, stateSet] = React.useState({
    //     user: "venkat",
    //     content: "",
    // });
    return (
    <Container>Test<Messages user="venkat" />
        {/*<Row>*/}
        {/*    <Col xs={2} style = {{ padding: 0}}>*/}
        {/*        <FormInput*/}
        {/*            label ="User"*/}
        {/*            value={state.user}*/}
        {/*            onChange={(evt) => stateSet({*/}
        {/*                ...state,*/}
        {/*                user: evt.target.value,*/}
        {/*            })}*/}
        {/*        />*/}
        {/*    </Col>*/}
        {/*    <Col xs={8}>*/}
        {/*        <FormInput*/}
        {/*            label ="Content"*/}
        {/*            value={state.content}*/}
        {/*            onChange={(evt) => stateSet({*/}
        {/*                ...state,*/}
        {/*                user: evt.target.value,*/}
        {/*            })}*/}
        {/*        />*/}
        {/*    </Col>*/}
        {/*</Row>*/}
    </Container>
)};

export default () => (
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>
);
