import { useEffect, useState } from "react";
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

  const handleOption = (value: Client) => {
    if (selectedOptions.includes(value)) {
      const options = selectedOptions.filter((option) => option !== value);
      setSelectedOptions([...options]);
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  useEffect(() => {
    const matchedOptions = options.filter((option) =>
      option.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilterOptions(matchedOptions ?? options);
  }, [searchText]);

  return (
    <S.Container id="container">
      <S.InputSearch
        type="text"
        placeholder="Pesquisar"
        onClick={() => setActiveDropdown(true)}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
          setSearchText(e.currentTarget.value)
        }
      />
      <div>
        {activeDropdown && (
          <S.Dropdown>
            {filterOptions.map((option) => (
              <S.DropdownItem
                key={option.id}
                onClick={() => handleOption(option)}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
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
          {selectedOptions.map((option) => (
            <S.Option key={option.id}>
              {option.name}{" "}
              <span onClick={() => handleOption(option)}>
                <IoClose />
              </span>
            </S.Option>
          ))}
        </S.SelectedOptions>
      </div>
    </S.Container>
  );
};
