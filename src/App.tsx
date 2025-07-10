import { MultiSelectDropdown } from "./components/MultiSelectDropdown";
import { mockClients } from "./mocks/clients";
import * as S from "./styles";

function App() {
  return (
    <>
      <S.Form>
        <S.Container>
          <S.Label>Empresas</S.Label>
          <MultiSelectDropdown options={mockClients} />
        </S.Container>
      </S.Form>
    </>
  );
}

export default App;
