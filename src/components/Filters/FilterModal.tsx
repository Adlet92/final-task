import React, { useCallback, useEffect, useState } from "react";
import { fetchFilterOptions } from "src/api/api";
import resetIcon from '../../assets/reset.svg';
import './FilterModal.css';

interface Option {
  value: string;
  label?: string;
  count: number;
}

interface ModalProps {
  query: string;
  closeModal: () => void;
  applyFilters: (filters: string) => void;
  filters: string;
}

const FilterModal: React.FC<ModalProps> = ({ query, closeModal, applyFilters, filters }) => {
  const [options, setOptions] = useState<Record<string, Option[]>>();

  const [gene, setGene] = useState<string>("");
  const [organismName, setOrganismName] = useState<string>("");
  const [annotationScore, setAnnotationScore] = useState<string>("");
  const [proteinWith, setProteinWith] = useState<string>("");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [resetClicked, setResetClicked] = useState(false);
  const isActive =
    gene ||
    organismName ||
    annotationScore ||
    proteinWith ||
    (fromValue && toValue);

    const filterValues = {
      gene,
      model_organism: organismName,
      length:
        +fromValue >= 401 && +toValue <= 600
          ? `[${fromValue} TO ${toValue}]`
          : "",
      annotation_score: annotationScore,
      proteins_with: proteinWith,
    };

    const extractOptions = useCallback(async () => {
      if (query) {
        const optionsData = await fetchFilterOptions(query);
        setOptions(optionsData);
      }
    }, [query]);

    useEffect(() => {
      extractOptions();
    }, [query, extractOptions]);

    useEffect(() => {
      const parseFilters = () => {
        const filterRegex = /\((\w+):([\w[\]\s]+)\)/g;
        let match;
        while ((match = filterRegex.exec(filters)) !== null) {
          const [, filterName, filterValue] = match;
          if (filterName === "gene") {
            setGene(filterValue);
          } else if (filterName === "model_organism") {
            setOrganismName(filterValue);
          } else if (filterName === "length") {
            const [from, to] = filterValue.slice(1, -1).split(" TO ");
            setFromValue(from);
            setToValue(to);
          } else if (filterName === "annotation_score") {
            setAnnotationScore(filterValue);
          } else if (filterName === "proteins_with") {
            setProteinWith(filterValue);
          }
        }
      };

      parseFilters();
    }, [filters]);

    const handleReset = () => {
      setGene("");
      setOrganismName("");
      setFromValue("");
      setToValue("");
      setAnnotationScore("");
      setProteinWith("");
      setResetClicked(true);
      applyFilters("");
      closeModal();
    };


  return (
    <>
    <div className="filter-modal-container">
      <div className="filter-modal-body">
        <div className="filter-label">
            Filters
            {/* <button
              className="buttons reset"
              onClick={handleReset}
            ></button> */}
          <img
              className="reset-image"
              src={resetIcon}
              alt="Reset"
              onClick={handleReset}/>

        </div>
        <div className="gene">
          <div className="labels">
            Gene Name
          </div>
            <input
              className="gene-input"
              placeholder="Enter Gene name"
              value={gene}
              onChange={(e) => {
                setGene(e.target.value);
              }}
            />
        </div>
        <div>
          <div>
            <div className="labels">Organism</div>
                <div className="custom-select">
                <select
                  className="select-class"
                  value={organismName}
                  onChange={(e) => {
                    setOrganismName(e.target.value);
                  }}
                >
                <option value="" disabled hidden>
                  Select an option
                  </option>
                    {options?.organism.map((option) => (
                      <option value={option.value} key={option.value + option.label}>{ option.label }</option>
                  ))}
                </select>
              </div>
          </div>
        </div>
        <div>
          <div className="labels">
            Sequence length
          </div>
          <div className="input-container">
              <input
                className="from-to-input"
                placeholder="From"
                value={fromValue}
                onChange={(e) => {
                  setFromValue(e.target.value);
                }}
                onBlur={() => {
                  if (+fromValue < 401) {
                    setFromValue("401");
                  }
                  if (toValue && +toValue <= +fromValue) {
                    setFromValue((+toValue - 1).toString());
                  }
                }}
              />
            <div className="divider"></div>
              <input
                className="from-to-input"
                placeholder="To"
                value={toValue}
                onChange={(e) => {
                  setToValue(e.target.value);
                }}
                onBlur={() => {
                  if (+toValue > 600) {
                    setToValue("600");
                  }
                  if (fromValue && +toValue <= +fromValue) {
                    setToValue((+fromValue + 1).toString());
                  }
                }}
              />
          </div>
        </div>
        <div>
          <div>
            <div className="labels">
              Annotation score
            </div>
            <div className="custom-select">
                <select
                  className="select-class"
                  value={annotationScore}
                  onChange={(e) => {
                    setAnnotationScore(e.target.value);
                  }}
                >
                <option value="" disabled hidden>
                  Select an option
                  </option>
                  {options?.annotation.map((option) => (
                    <option value={option.value} key={option.value + option.value}>{option.value}</option>
                  ))}
                </select>
              </div>
          </div>
        </div>
        <div>
          <div>
            <div className="labels">Protein with</div>
              <div className="custom-select">
                <select
                  className="select-class"
                  value={proteinWith}
                  onChange={(e) => {
                    setProteinWith(e.target.value);
                  }}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                    {options?.protein.map((option) => (
                      <option value={option.value} key={option.value + option.label}>{option.label}</option>
                    ))}
                  </select>
                </div>
          </div>
        </div>
        <div className="button-container">
            <button
              className="buttons cancel"
              onClick={(e) => {
                e.preventDefault();
                closeModal();
              }}
            >Cancel</button>
            <button
              className={`buttons apply ${isActive ? 'active-button' : ''}`}
              disabled={!isActive}
              onClick={() => {
                const filters = Object.entries(filterValues).reduce(
                  (acc, item) => {
                    if (item[1] !== "") {
                      return acc + ` AND (${item[0]}:${item[1]})`;
                    } else {
                      return acc + "";
                    }
                  },
                  ""
                );
                if (filters.length) {
                  applyFilters(filters);
                }
                closeModal();
                console.log(filterValues)

              }}
            >Apply Filters</button>
        </div>
      </div>
    </div>
  </>
  );
};

export default FilterModal;
