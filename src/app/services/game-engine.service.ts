import { Injectable } from '@angular/core';
import {CityManagementService} from "./city-management.service";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  _paused = true;

  constructor(
    private cityManagementService: CityManagementService
  ) {}

  pause() {
    this._paused = true;
  }

  unpause() {
    this._paused = false;
    this._gameTick();
  }

  _gameTick() {
    if (!this._paused) {
      this._doTurn();
      setTimeout(() => {
        this._gameTick();
      }, 500);
    }
  }

  _doTurn() {
    this.cityManagementService.tick();
  }
}
