import { makeAutoObservable } from "mobx";
import domainStore, { DomainStore } from "./domain-store";
import uiStore, { UIStore } from "./ui-store";

class RootStore {
  uiStore: UIStore
  domainStore: DomainStore

  constructor(domainStore: DomainStore, uiStore: UIStore) {
    this.uiStore = uiStore
    this.domainStore = domainStore
    makeAutoObservable(this)
  }
}

export default new RootStore(domainStore, uiStore)