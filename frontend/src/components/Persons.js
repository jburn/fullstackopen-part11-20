import Person from './Person'

const Persons = ( {persons, del} ) => {
    return (
    <ul>
        {persons.map(person => 
            <div>
                <Person name={person.name} number={person.number} id={person.id} del={del}/>
            </div>
            
            )}
    </ul>
    )
    }

export default Persons
