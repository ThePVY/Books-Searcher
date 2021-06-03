import { makeAutoObservable } from "mobx";
import DomainStore from "./domain-store";
import UIStore from "./ui-store";

export class RootStore {
  uiStore: UIStore
  domainStore: DomainStore

  constructor() {
    this.uiStore = new UIStore(this)
    this.domainStore = new DomainStore(this)
    makeAutoObservable(this)
  }
}

const rootStore = new RootStore()

export default rootStore
