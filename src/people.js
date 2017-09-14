import React from 'react';
import ReactDOM from 'react-dom';
import Person from './person';

import { graphql, gql } from 'react-apollo';

const PERSON_QUERY = gql`
  {
    jakes {
      firstName
      lastName
    }
  }
`;

const ADDRESSES_QUERY = gql`
  {
    jakes {
      address {
        street
      }
    }
  }
`;

const People = props => {
  console.log(props);
  const people = props.people;

  return (
    <div>
      {people ? (
        people.map(({ firstName, lastName }) => (
          <Person
            key={Math.random()}
            firstName={firstName}
            lastName={lastName}
          />
        ))
      ) : (
        <p>Aint nothin here</p>
      )}
    </div>
  );
};

const withData = graphql(PERSON_QUERY, {
  props: data => {
    return { people: data.data.jakes };
  },
});

export default withData(People);
