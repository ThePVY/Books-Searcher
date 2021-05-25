import { IEditionInfo } from "./app-reducer";
import { RootStateT } from "./store-redux";


const selector = {
  getPageSize(state: RootStateT): number {
    return state.app.pageSize
  },
  getPagesNum(state: RootStateT): number {
    return state.app.pagesNum
  },
  getCurrentPage(state: RootStateT): number {
    return state.app.currentPage
  },
  getItemsOnPage(state: RootStateT): IEditionInfo[] {
    return state.app.itemsOnPage
  },
  getIsSearching(state: RootStateT): boolean {
    return state.app.searching
  },
  getLastQuery(state: RootStateT): string {
    return state.app.lastQuery
  },
  getSearchCount(state: RootStateT): number {
    return state.app.searchCount
  },
  getUniqueTitles(state: RootStateT): string[] {
    return state.app.uniqueTitles
  }
}

export default selector