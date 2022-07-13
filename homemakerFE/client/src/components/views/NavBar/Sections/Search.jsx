import React from 'react'
import classes from './Search.module.css'

const Search = (props) => (
    <div className={classes.searchBox}>
        <form className={classes.box}>
          <input type="text" id="word" placeholder='search'/>
        </form>
    </div>
)

export default Search