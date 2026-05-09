/*
 * Copyright (c) 2026 SoftwarEnTalla
 * Licencia: MIT
 * Contacto: softwarentalla@gmail.com
 * CEOs: 
 *       Persy Morell Guerra      Email: pmorellpersi@gmail.com  Phone : +53-5336-4654 Linkedin: https://www.linkedin.com/in/persy-morell-guerra-288943357/
 *       Dailyn García Domínguez  Email: dailyngd@gmail.com      Phone : +53-5432-0312 Linkedin: https://www.linkedin.com/in/dailyn-dominguez-3150799b/
 *
 * CTO: Persy Morell Guerra
 * COO: Dailyn García Domínguez and Persy Morell Guerra
 * CFO: Dailyn García Domínguez and Persy Morell Guerra
 *
 * Repositories: 
 *               https://github.com/SoftwareEnTalla 
 *
 *               https://github.com/apokaliptolesamale?tab=repositories
 *
 *
 * Social Networks:
 *
 *              https://x.com/SoftwarEnTalla
 *
 *              https://www.facebook.com/profile.php?id=61572625716568
 *
 *              https://www.instagram.com/softwarentalla/
 *              
 *
 *
 */

import { InputType, Field, Float, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';




@InputType()
export class BaseIntegrationStatusDto {
  @ApiProperty({
    type: () => String,
    description: 'Nombre de instancia CreateIntegrationStatus',
    example: 'Nombre de instancia CreateIntegrationStatus',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  name: string = '';

  // Propiedades predeterminadas de la clase CreateIntegrationStatusDto según especificación del sistema

  @ApiProperty({
    type: () => Date,
    description: 'Fecha de creación de la instancia (CreateIntegrationStatus).',
    example: 'Fecha de creación de la instancia (CreateIntegrationStatus).',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: () => Date,
    description: 'Fecha de actualización de la instancia (CreateIntegrationStatus).',
    example: 'Fecha de actualización de la instancia (CreateIntegrationStatus).',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: () => String,
    description:
      'Usuario que realiza la creación de la instancia (CreateIntegrationStatus).',
    example:
      'Usuario que realiza la creación de la instancia (CreateIntegrationStatus).',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdBy?: string; // Usuario que crea el objeto

  @ApiProperty({
    type: () => Boolean,
    description: 'Estado de activación de la instancia (CreateIntegrationStatus).',
    example: 'Estado de activación de la instancia (CreateIntegrationStatus).',
    nullable: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { nullable: false })
  isActive: boolean = false; // Por defecto, el objeto no está activo

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Código del estado',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Código del estado', nullable: false })
  code!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Nombre visible del estado',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Nombre visible del estado', nullable: false })
  displayName!: string;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si el estado es terminal',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si el estado es terminal', nullable: false })
  isTerminal!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si el estado permite operación',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si el estado permite operación', nullable: false })
  isOperational!: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Severidad asociada al estado',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Severidad asociada al estado', nullable: true })
  severity?: string = '';

  // Constructor
  constructor(partial: Partial<BaseIntegrationStatusDto>) {
    Object.assign(this, partial);
  }
}




@InputType()
export class IntegrationStatusDto extends BaseIntegrationStatusDto {
  // Propiedades específicas de la clase IntegrationStatusDto en cuestión

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Identificador único de la instancia',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  // Constructor
  constructor(partial: Partial<IntegrationStatusDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<IntegrationStatusDto>): IntegrationStatusDto {
    const instance = new IntegrationStatusDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
} 




@InputType()
export class IntegrationStatusValueInput {
  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Campo de filtro',
  })
  @Field({ nullable: false })
  fieldName: string = 'id';

  @ApiProperty({
    type: () => IntegrationStatusDto,
    nullable: false,
    description: 'Valor del filtro',
  })
  @Field(() => IntegrationStatusDto, { nullable: false })
  fieldValue: any; // Permite cualquier tipo
} 




@ObjectType()
export class IntegrationStatusOutPutDto extends BaseIntegrationStatusDto {
  // Propiedades específicas de la clase IntegrationStatusOutPutDto en cuestión

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Identificador único de la instancia',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  // Constructor
  constructor(partial: Partial<IntegrationStatusOutPutDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<IntegrationStatusOutPutDto>): IntegrationStatusOutPutDto {
    const instance = new IntegrationStatusOutPutDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}



@InputType()
export class CreateIntegrationStatusDto extends BaseIntegrationStatusDto {
  // Propiedades específicas de la clase CreateIntegrationStatusDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a crear',
    example:
      'Se proporciona un identificador de CreateIntegrationStatus a crear \(opcional\) ',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  // Constructor
  constructor(partial: Partial<CreateIntegrationStatusDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<CreateIntegrationStatusDto>): CreateIntegrationStatusDto {
    const instance = new CreateIntegrationStatusDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}



@InputType()
export class CreateOrUpdateIntegrationStatusDto {
  @ApiProperty({
    type: () => String,
    description: 'Identificador',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  @ApiProperty({
    type: () => CreateIntegrationStatusDto,
    description: 'Instancia CreateIntegrationStatus o UpdateIntegrationStatus',
    nullable: true,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Field(() => CreateIntegrationStatusDto, { nullable: true })
  input?: CreateIntegrationStatusDto | UpdateIntegrationStatusDto; // Asegúrate de que esto esté correcto
}



@InputType()
export class DeleteIntegrationStatusDto {
  // Propiedades específicas de la clase DeleteIntegrationStatusDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a eliminar',
    example: 'Se proporciona un identificador de DeleteIntegrationStatus a eliminar',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  id: string = '';

  @ApiProperty({
    type: () => String,
    description: 'Lista de identificadores de instancias a eliminar',
    example:
      'Se proporciona una lista de identificadores de DeleteIntegrationStatus a eliminar',
    default: [],
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  ids?: string[];
}



@InputType()
export class UpdateIntegrationStatusDto extends BaseIntegrationStatusDto {
  // Propiedades específicas de la clase UpdateIntegrationStatusDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a actualizar',
    example: 'Se proporciona un identificador de UpdateIntegrationStatus a actualizar',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  id!: string;

  // Constructor
  constructor(partial: Partial<UpdateIntegrationStatusDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<UpdateIntegrationStatusDto>): UpdateIntegrationStatusDto {
    const instance = new UpdateIntegrationStatusDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
} 



