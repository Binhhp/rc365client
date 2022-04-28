import * as React from "react";
import { SearchButtonWrapper, ButtonWrapper } from "./SearchStyle";
import { ISearchProps, ISearchState } from "./SearchModels";
import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import TextField from "aod-dependencies/TextField/CustomTextField";
import { LoadingSpinner } from "src/common/ui/Loading";
import { SpinnerSize } from "aod-dependencies/Spinner";
import { BuildRCAttribute } from "src/common/functions";
import { BaseOrganization } from "src/common/classes/BaseOrganization";

class SearchButton extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      isHaveTyping: false,
      isLoadingSearch: false,
      typingTimeout: 0,
      text: "",
    };
  }

  onSentData = (val: BaseOrganization[], text: string) => {
    this.props.onGetFilterData(text !== "" ? val : null);
  };

  onHandleSearching = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    this.setState({ isLoadingSearch: true });
    if (newValue) {
      let result = this.props.data.filter((item) => {
        return item.name
          .toLocaleLowerCase()
          .includes(newValue.toLocaleLowerCase());
      });
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      this.setState({
        isHaveTyping: true,
        text: newValue,
        typingTimeout: window.setTimeout(() => {
          this.onSentData(result, newValue);
          this.setState({ isLoadingSearch: false });
        }, 1000),
      });
    } else {
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      this.setState({
        isHaveTyping: true,
        text: "",
        typingTimeout: window.setTimeout(() => {
          this.onSentData([], "");
          this.setState({ isHaveTyping: false, isLoadingSearch: false });
        }, 1000),
      });
    }
  };

  onHandleClearSearch = () => {
    this.setState({
      text: "",
      isHaveTyping: false,
      isLoadingSearch: false,
    });
    this.onSentData([], "");
  };

  render() {
    let idSearchBtn = BuildRCAttribute(`btn.search`);
    return (
      <SearchButtonWrapper className="SearchButtonWrapper">
        <ButtonWrapper
          {...idSearchBtn}
          theme={{
            darkMode: this.props.theme,
            isHaveTyping: this.state.isHaveTyping,
          }}
          className="ButtonWrapper"
        >
          {this.state.isLoadingSearch ? (
            <LoadingSpinner
              className="search__loading"
              darkMode={this.props.theme}
              size={SpinnerSize.medium}
              rcName="loading.org.search"
            />
          ) : (
            <Icon
              className="search__icon"
              iconName="Search"
              rcName="search.org"
            />
          )}
          <TextField
            className="search__input"
            placeholder="Search"
            darkMode={this.props.theme}
            onChange={this.onHandleSearching}
            rcName="org.search"
            value={this.state.text}
            onFocus={() => this.setState({ isHaveTyping: true })}
            onBlur={() =>
              this.setState({ isHaveTyping: false, isLoadingSearch: false })
            }
          />
          {this.state.text.trim() !== "" && (
            <Icon
              className="search__remove"
              iconName="ErrorBadge"
              rcName="search.remove"
              onClick={this.onHandleClearSearch}
            />
          )}
        </ButtonWrapper>
      </SearchButtonWrapper>
    );
  }
}

export default SearchButton;
