import { makeAutoObservable } from "mobx";
import DomainStore from "./domain-store";
import HistoryController from "./historyController";
import UIStore from "./ui-store";

export class RootStore {
  uiStore: UIStore
  domainStore: DomainStore
  historyCtrl: HistoryController

  constructor() {
    this.uiStore = new UIStore(this)
    this.domainStore = new DomainStore(this)
    this.historyCtrl = new HistoryController(this)
    makeAutoObservable(this)
  }
}

const rootStore = new RootStore()

export default rootStore
