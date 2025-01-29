
const Person = ({ name, number, id, del }) => {
    return (
      <div>
        <li>{name} {number} <button type="submit" onClick={() => del(id)}>delete</button></li>
      </div>
      
    )
  }
  
export default Person