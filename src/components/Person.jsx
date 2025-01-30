const Person = ({ name, number, id, del }) => {
    return (
      <div data-testid='personDiv'>
        <li>{name} {number} <button data-testid='deleteButton' type='submit' onClick={() => del(id)}>delete</button></li>
      </div>
      
    )
  }
  
export default Person