import { Injectable } from '@nestjs/common';

@Injectable()
export class RulesService {
  private rules = [{ countries: ['USA', 'IL'], companyName: 'Wix' }];

  findAll() {
    return this.rules;
  }
}
