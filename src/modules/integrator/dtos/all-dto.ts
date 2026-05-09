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
export class BaseIntegratorDto {
  @ApiProperty({
    type: () => String,
    description: 'Nombre de instancia CreateIntegrator',
    example: 'Nombre de instancia CreateIntegrator',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  name: string = '';

  // Propiedades predeterminadas de la clase CreateIntegratorDto según especificación del sistema

  @ApiProperty({
    type: () => Date,
    description: 'Fecha de creación de la instancia (CreateIntegrator).',
    example: 'Fecha de creación de la instancia (CreateIntegrator).',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: () => Date,
    description: 'Fecha de actualización de la instancia (CreateIntegrator).',
    example: 'Fecha de actualización de la instancia (CreateIntegrator).',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: () => String,
    description:
      'Usuario que realiza la creación de la instancia (CreateIntegrator).',
    example:
      'Usuario que realiza la creación de la instancia (CreateIntegrator).',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdBy?: string; // Usuario que crea el objeto

  @ApiProperty({
    type: () => Boolean,
    description: 'Estado de activación de la instancia (CreateIntegrator).',
    example: 'Estado de activación de la instancia (CreateIntegrator).',
    nullable: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { nullable: false })
  isActive: boolean = false; // Por defecto, el objeto no está activo

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Código único de la integración',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Código único de la integración', nullable: false })
  code!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Proveedor o plataforma asociada',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Proveedor o plataforma asociada', nullable: false })
  providerCode!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Categoría funcional de la integración',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Categoría funcional de la integración', nullable: false })
  category!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Ambiente operativo',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Ambiente operativo', nullable: false })
  environment!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Esquema de autenticación principal',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Esquema de autenticación principal', nullable: false })
  authScheme!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Estado operativo de la integración',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Estado operativo de la integración', nullable: false })
  status!: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Alias de la credencial activa',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Alias de la credencial activa', nullable: true })
  credentialAlias?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Identificador del endpoint principal',
  })
  @IsUUID()
  @IsOptional()
  @Field(() => String, { description: 'Identificador del endpoint principal', nullable: true })
  primaryEndpointId?: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Equipo responsable de la integración',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Equipo responsable de la integración', nullable: true })
  ownerTeam?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Propósito funcional y operativo',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Propósito funcional y operativo', nullable: true })
  purpose?: string = '';

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Permite tráfico entrante hacia el ERP',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Permite tráfico entrante hacia el ERP', nullable: false })
  supportsInbound!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Permite tráfico saliente desde el ERP',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Permite tráfico saliente desde el ERP', nullable: false })
  supportsOutbound!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Permite callbacks o webhooks',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Permite callbacks o webhooks', nullable: false })
  supportsWebhook!: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Motivo operativo del estado actual',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Motivo operativo del estado actual', nullable: true })
  statusReason?: string = '';

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Fecha del último cambio de estado',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Fecha del último cambio de estado', nullable: true })
  statusChangedAt?: Date = new Date();

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Fecha de última validación técnica',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Fecha de última validación técnica', nullable: true })
  lastValidatedAt?: Date = new Date();

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Próxima fecha prevista de rotación',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Próxima fecha prevista de rotación', nullable: true })
  nextRotationAt?: Date = new Date();

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Metadatos adicionales de interoperabilidad',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Metadatos adicionales de interoperabilidad', nullable: true })
  metadata?: Record<string, any> = {};

  // Constructor
  constructor(partial: Partial<BaseIntegratorDto>) {
    Object.assign(this, partial);
  }
}




@InputType()
export class IntegratorDto extends BaseIntegratorDto {
  // Propiedades específicas de la clase IntegratorDto en cuestión

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
  constructor(partial: Partial<IntegratorDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<IntegratorDto>): IntegratorDto {
    const instance = new IntegratorDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
} 




@InputType()
export class IntegratorValueInput {
  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Campo de filtro',
  })
  @Field({ nullable: false })
  fieldName: string = 'id';

  @ApiProperty({
    type: () => IntegratorDto,
    nullable: false,
    description: 'Valor del filtro',
  })
  @Field(() => IntegratorDto, { nullable: false })
  fieldValue: any; // Permite cualquier tipo
} 




@ObjectType()
export class IntegratorOutPutDto extends BaseIntegratorDto {
  // Propiedades específicas de la clase IntegratorOutPutDto en cuestión

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
  constructor(partial: Partial<IntegratorOutPutDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<IntegratorOutPutDto>): IntegratorOutPutDto {
    const instance = new IntegratorOutPutDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}



@InputType()
export class CreateIntegratorDto extends BaseIntegratorDto {
  // Propiedades específicas de la clase CreateIntegratorDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a crear',
    example:
      'Se proporciona un identificador de CreateIntegrator a crear \(opcional\) ',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  // Constructor
  constructor(partial: Partial<CreateIntegratorDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<CreateIntegratorDto>): CreateIntegratorDto {
    const instance = new CreateIntegratorDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}



@InputType()
export class CreateOrUpdateIntegratorDto {
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
    type: () => CreateIntegratorDto,
    description: 'Instancia CreateIntegrator o UpdateIntegrator',
    nullable: true,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Field(() => CreateIntegratorDto, { nullable: true })
  input?: CreateIntegratorDto | UpdateIntegratorDto; // Asegúrate de que esto esté correcto
}



@InputType()
export class DeleteIntegratorDto {
  // Propiedades específicas de la clase DeleteIntegratorDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a eliminar',
    example: 'Se proporciona un identificador de DeleteIntegrator a eliminar',
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
      'Se proporciona una lista de identificadores de DeleteIntegrator a eliminar',
    default: [],
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  ids?: string[];
}



@InputType()
export class UpdateIntegratorDto extends BaseIntegratorDto {
  // Propiedades específicas de la clase UpdateIntegratorDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a actualizar',
    example: 'Se proporciona un identificador de UpdateIntegrator a actualizar',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  id!: string;

  // Constructor
  constructor(partial: Partial<UpdateIntegratorDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<UpdateIntegratorDto>): UpdateIntegratorDto {
    const instance = new UpdateIntegratorDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
} 



