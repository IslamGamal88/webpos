import { Controller, Get } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';

@Controller('items')
export class CatalogueController {
  constructor(private catalogueService: CatalogueService) {}
  @Get()
  getCatalogueItems() {
    return this.catalogueService.getCatalogueItems();
  }
}
