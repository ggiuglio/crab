import React from "react";
import { connect } from "react-redux";
import PersonCost from "../people/personCost";

const Person = ({ people, project, persons, handleCreate, handleChange }) => {
  React.useEffect(() => {
    if(people && people.length > 0) {
      const pArray = [];
      people.map((person) => pArray.push(...buildPersonArray(person)));
      handleCreate(pArray);
    }
  }, [people]);

  const buildPersonArray = (person) => {
    let personC = [];
    personC.push({
      id: person.id,
      geo: 'General',
      title: person.title,
      fee: person.fee,
      geoBool: person.geobool
    });
    if (person.geobool) {
      Object.keys(project.geo)
        .map((nation) => {
          personC.push({
            id: person.id,
            geo: project.geo[nation].description,
            title: person.title + " - " + project.geo[nation].description,
            fee: person.fee,
            geoBool: person.geobool
          });
      });
    }
    return personC;
  };

  return (
    <div className="row">
      <div className="col s10 offset-s1 bolder center">
        Hourly cost
      </div>
      <table>
        <thead>
          <tr>
            <th>Person</th>
            <th className="center">Fee €/h</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (<PersonCost key={person.title} person={person} handleChange={handleChange} />))}
        </tbody>
      </table>
    </div>
   )
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);
