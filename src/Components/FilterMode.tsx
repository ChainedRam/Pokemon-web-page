import * as React from "react";
import { Button, ButtonGroup } from "reactstrap";

export interface IFilterProps {
  filteredSelection: string[];
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
  checkBoxTypes = [
    { type: "fire", isChecked: false },
    { type: "water", isChecked: false },
    { type: "grass", isChecked: false },
    { type: "dark", isChecked: false },
    { type: "normal", isChecked: false }
  ];

  onClicked(boxNumber: number) {
    let checkBoxTypesCopy = [...this.checkBoxTypes];
    checkBoxTypesCopy[boxNumber].isChecked = !checkBoxTypesCopy[boxNumber]
      .isChecked;
    let flagChecks = checkBoxTypesCopy.filter(c => c.isChecked);
    let filterCount = flagChecks.length;
    console.log(filterCount);
    if (filterCount > 2) {
      checkBoxTypesCopy[boxNumber].isChecked = !checkBoxTypesCopy[boxNumber]
        .isChecked;
      return;
    }

    this.setState({ checkBox: checkBoxTypesCopy });
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
