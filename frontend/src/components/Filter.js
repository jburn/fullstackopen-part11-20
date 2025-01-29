const Filter = ({ text, filterValue, onChange }) => {
    return (
    <form>
        <div>
          {text}
          <input 
          value={filterValue}
          onChange={onChange}
          />
        </div>
      </form>
    )
    }
export default Filter