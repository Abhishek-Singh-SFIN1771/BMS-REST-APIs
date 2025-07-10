export interface BookAdapterInterface<Entity, Dto> 
{
  entityToDto(model: Entity): Dto;

  dtoToEntity(dto: Dto): Promise<Entity>;
}