import React from "react";

import "./SearchForm.css";

interface ISearchFormProps {
  placeholderText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm = ({ placeholderText, onSubmit, onChange }: ISearchFormProps) => {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label htmlFor="search">
        <span>{placeholderText}</span>
        <input type="text" id="search" placeholder={"Entrez un titre..."} onChange={onChange} />
      </label>
    </form>
  );
};

export default SearchForm;
