import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import * as S from "./styles";

type Client = {
  id: number;
  name: string;
  cnpj: string;
};

interface IProps {
  options: Client[];
}

export const MultiSelectDropdown = ({ options }: IProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<Client[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<Client[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusedOption, setFocusedOption] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCloseDropdown = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const container = document.querySelector("#container");
    if (container && !container.contains(target)) {
      setActiveDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);
    return () => document.removeEventListener("click", handleCloseDropdown);
  }, []);

  const handleOption = (value: Client, index: number) => {
    if (selectedOptions.includes(value)) {
      const options = selectedOptions.filter((option) => option !== value);
      setSelectedOptions([...options]);
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
    setFocusedOption(index);
  };

  useEffect(() => {
    const matchedOptions = options.filter((option) =>
      option.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilterOptions(matchedOptions ?? options);
  }, [searchText]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }

    switch (e.key) {
      case "ArrowUp":
        setFocusedOption((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)));
        break;
      case "ArrowDown":
        setFocusedOption((prev) =>
          Math.min(prev === null ? 0 : prev + 1, filterOptions.length - 1)
        );
        break;
      case "Enter":
        if (focusedOption !== null) {
          handleOption(filterOptions[focusedOption], focusedOption);
        }
        break;
      case "Escape":
        setActiveDropdown(false);
        if (inputRef.current) {
          inputRef.current.blur();
        }
        break;
    }

    if (dropdownRef.current) {
      const selectedElement = dropdownRef.current.children[
        focusedOption ?? 0
      ] as HTMLElement;
      selectedElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeDropdown]);

  return (
    <S.Container id="container">
      <S.InputSearch
        type="text"
        placeholder="Pesquisar"
        onClick={() => setActiveDropdown(true)}
        onKeyUp={handleKeyUp}
        onChange={(e) => setSearchText(e.target.value)}
        ref={inputRef}
      />
      <div>
        {activeDropdown && (
          <S.Dropdown ref={dropdownRef}>
            {filterOptions.map((option, index) => (
              <S.DropdownItem
                key={option.id}
                onClick={() => handleOption(option, index)}
                style={{
                  backgroundColor: focusedOption === index ? "#e3e3e3" : "",
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    readOnly
                  />
                  {option.name}
                </div>
                <span>{option.id}</span>
                <span>{option.cnpj}</span>
              </S.DropdownItem>
            ))}
          </S.Dropdown>
        )}
        <S.SelectedOptions>
          {selectedOptions.map((option, index) => (
            <S.Option key={option.id}>
              {option.name}{" "}
              <span onClick={() => handleOption(option, index)}>
                <IoClose />
              </span>
            </S.Option>
          ))}
        </S.SelectedOptions>
      </div>
    </S.Container>
  );
};
