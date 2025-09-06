import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  IsUrl,
} from 'class-validator';

export enum CompanyIndustry {
  ACCOUNTING = 'ACCOUNTING',
  AIRLINES_AVIATION = 'AIRLINES_AVIATION',
  ANIMATION = 'ANIMATION',
  APPAREL_FASHION = 'APPAREL_FASHION',
  ARCHITECTURE_PLANNING = 'ARCHITECTURE_PLANNING',
  ARTS_AND_CRAFTS = 'ARTS_AND_CRAFTS',
  AUTOMOTIVE = 'AUTOMOTIVE',
  AVIATION_AEROSPACE = 'AVIATION_AEROSPACE',
  BANKING = 'BANKING',
  BIOTECHNOLOGY = 'BIOTECHNOLOGY',
  BROADCAST_MEDIA = 'BROADCAST_MEDIA',
  BUILDING_MATERIALS = 'BUILDING_MATERIALS',
  BUSINESS_SUPPLIES_AND_EQUIPMENT = 'BUSINESS_SUPPLIES_AND_EQUIPMENT',
  CAPITAL_MARKETS = 'CAPITAL_MARKETS',
  CHEMICALS = 'CHEMICALS',
  CIVIC_SOCIAL_ORGANIZATION = 'CIVIC_SOCIAL_ORGANIZATION',
  CIVIL_ENGINEERING = 'CIVIL_ENGINEERING',
}

export enum ContactDevice {
  TABLET = 'Tablet',
  PC = 'PC',
  MOBILE = 'Mobile',
}

export class EvaluateContactDto {
  @IsOptional()
  @IsString()
  contactCountry?: string;

  @IsOptional()
  @IsNumber()
  companySize?: number;

  @IsOptional()
  @IsString()
  companyHQCountry?: string;

  @IsOptional()
  @IsEnum(CompanyIndustry)
  companyIndustry?: CompanyIndustry;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsEnum(ContactDevice)
  contactDevice?: ContactDevice;

  @IsOptional()
  @IsUrl()
  firstPage?: string;

  @IsOptional()
  @IsDateString()
  firstSeen?: string;

  @IsOptional()
  @IsDateString()
  lastSeen?: string;
}
