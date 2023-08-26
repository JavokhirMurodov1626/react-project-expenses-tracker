import React from "react";
import styled from "styled-components";

const years = [2021, 2022, 2023];

const Select = styled.select`
  max-width: max-content;
  margin-left: auto;
`;

function FilterComponent({onChangeYear,selectedYear}) {
  return (
    <div className="col-6 mx-auto mt-3">
      <Select className="form-select" value={selectedYear} onChange={(e)=>onChangeYear(e.target.value)}>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default FilterComponent;
