import * as React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { Type, Pokemon } from "../data/dataType";

export interface IFilterProps {
  filteredSelection: Type[];
  pokemonList: Pokemon[];
  onFiltered(pokemonList: Pokemon[]);
}
export interface IFilterModeState {
  checkBox: ICheckBoxTypesState[];
}
export interface ICheckBoxTypesState {
  type: string;
  isChecked: boolean;
}

export default class FilterMode extends React.PureComponent<
  IFilterProps,
  IFilterModeState
> {
  componentDidMount() {
    this.setState({ checkBox: this.checkBoxTypes });
  }
  checkBoxTypes = this.props.filteredSelection.map(e => {
    return { type: e.name, isChecked: false };
  });

  onClicked(boxNumber: number) {
    let checkBoxTypesCopy = [...this.checkBoxTypes];
    checkBoxTypesCopy[boxNumber].isChecked = !checkBoxTypesCopy[boxNumber]
      .isChecked;
    let flagCheck = checkBoxTypesCopy.filter(c => c.isChecked);
    let filterCount = flagCheck.length;
    if (filterCount > 2) {
      checkBoxTypesCopy[boxNumber].isChecked = !checkBoxTypesCopy[boxNumber]
        .isChecked;
      return;
    }
    this.setState({ checkBox: checkBoxTypesCopy });
    if (filterCount === 0) {
      this.props.onFiltered(this.props.pokemonList);
      return;
    }
    let targetType = flagCheck.map(nt => nt.type)[0];
    let filteredList = this.props.pokemonList.filter(p => {
      let poketypes = p.types.map(typ => typ.name);
      if (poketypes.indexOf(targetType) >= 0) return true;
      else return false;
    });

    this.props.onFiltered(filteredList);
  }
  public render() {
    return (
      <div>
        <ButtonGroup>
          {this.checkBoxTypes.map((t, i) => (
            <Button
              color={t.isChecked ? "primary" : "secondary"}
              key={i}
              onClick={() => this.onClicked(i)}
            >
              {t.type}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}
