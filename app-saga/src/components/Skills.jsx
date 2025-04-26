import {useSelector, useDispatch} from 'react-redux'
import {changeSearchField} from '../actions/actionsCreators.js'

export default function Skills() {
  const {items, loading, search, error} = useSelector(state => state.skills)
  const dispatch = useDispatch()

  const handleSearch = (event) => {
    const {value} = event.target
    dispatch(changeSearchField(value))
  }

  const hasQuery = search.trim() !== ""

  return (
    <>
      <div><input type="search" value={search} onChange={handleSearch}/></div>
      {!hasQuery && <div>Type something to search</div>}
      {hasQuery && loading &&<div>searching...</div>}
      {error
        ? <div>Error occured</div>
        : <ul>{items.map(o => <li key={o.id}>{o.name}</li>)}</ul>
      }
    </>
  )
}