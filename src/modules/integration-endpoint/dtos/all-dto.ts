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
export class BaseIntegrationEndpointDto {
  @ApiProperty({
    type: () => String,
    description: 'Nombre de instancia CreateIntegrationEndpoint',
    example: 'Nombre de instancia CreateIntegrationEndpoint',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  name: string = '';

  // Propiedades predeterminadas de la clase CreateIntegrationEndpointDto según especificación del sistema

  @ApiProperty({
    type: () => Date,
    description: 'Fecha de creación de la instancia (CreateIntegrationEndpoint).',
    example: 'Fecha de creación de la instancia (CreateIntegrationEndpoint).',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: () => Date,
    description: 'Fecha de actualización de la instancia (CreateIntegrationEndpoint).',
    example: 'Fecha de actualización de la instancia (CreateIntegrationEndpoint).',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: () => String,
    description:
      'Usuario que realiza la creación de la instancia (CreateIntegrationEndpoint).',
    example:
      'Usuario que realiza la creación de la instancia (CreateIntegrationEndpoint).',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdBy?: string; // Usuario que crea el objeto

  @ApiProperty({
    type: () => Boolean,
    description: 'Estado de activación de la instancia (CreateIntegrationEndpoint).',
    example: 'Estado de activación de la instancia (CreateIntegrationEndpoint).',
    nullable: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { nullable: false })
  isActive: boolean = false; // Por defecto, el objeto no está activo

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Integración propietaria del endpoint',
  })
  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, { description: 'Integración propietaria del endpoint', nullable: false })
  integratorId!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Tipo de endpoint',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Tipo de endpoint', nullable: false })
  endpointType!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'URL base del endpoint',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'URL base del endpoint', nullable: false })
  baseUrl!: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Host principal',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Host principal', nullable: true })
  host?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'DNS asociado',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'DNS asociado', nullable: true })
  dnsName?: string = '';

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Allowlist de IPs',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Allowlist de IPs', nullable: true })
  ipAllowlist?: Record<string, any> = {};

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Allowlist de DNS',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Allowlist de DNS', nullable: true })
  dnsAllowlist?: Record<string, any> = {};

  @ApiProperty({
    type: () => Number,
    nullable: true,
    description: 'Puerto técnico',
  })
  @IsInt()
  @IsOptional()
  @Field(() => Int, { description: 'Puerto técnico', nullable: true })
  port?: number = 0;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Ruta base',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Ruta base', nullable: true })
  basePath?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Región técnica',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Región técnica', nullable: true })
  region?: string = '';

  @ApiProperty({
    type: () => Number,
    nullable: true,
    description: 'Timeout en milisegundos',
  })
  @IsInt()
  @IsOptional()
  @Field(() => Int, { description: 'Timeout en milisegundos', nullable: true })
  timeoutMs?: number = 0;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Proxy técnico si aplica',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Proxy técnico si aplica', nullable: true })
  proxyUrl?: string = '';

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si es el endpoint principal',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si es el endpoint principal', nullable: false })
  isPrimary!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si acepta tráfico entrante',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si acepta tráfico entrante', nullable: false })
  isInbound!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si se usa para tráfico saliente',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si se usa para tráfico saliente', nullable: false })
  isOutbound!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si es callback/webhook',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si es callback/webhook', nullable: false })
  isCallback!: boolean;

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Metadatos adicionales del endpoint',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Metadatos adicionales del endpoint', nullable: true })
  metadata?: Record<string, any> = {};

  // Constructor
  constructor(partial: Partial<BaseIntegrationEndpointDto>) {
    Object.assign(this, partial);
  }
}




@InputType()
export class IntegrationEndpointDto extends BaseIntegrationEndpointDto {
  // Propiedades específicas de la clase IntegrationEndpointDto en cuestión

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
  constructor(partial: Partial<IntegrationEndpointDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<IntegrationEndpointDto>): IntegrationEndpointDto {
    const instance = new IntegrationEndpointDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
} 




@InputType()
export class IntegrationEndpointValueInput {
  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Campo de filtro',
  })
  @Field({ nullable: false })
  fieldName: string = 'id';

  @ApiProperty({
    type: () => IntegrationEndpointDto,
    nullable: false,
    description: 'Valor del filtro',
  })
  @Field(() => IntegrationEndpointDto, { nullable: false })
  fieldValue: any; // Permite cualquier tipo
} 




@ObjectType()
export class IntegrationEndpointOutPutDto extends BaseIntegrationEndpointDto {
  // Propiedades específicas de la clase IntegrationEndpointOutPutDto en cuestión

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
  constructor(partial: Partial<IntegrationEndpointOutPutDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<IntegrationEndpointOutPutDto>): IntegrationEndpointOutPutDto {
    const instance = new IntegrationEndpointOutPutDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}



@InputType()
export class CreateIntegrationEndpointDto extends BaseIntegrationEndpointDto {
  // Propiedades específicas de la clase CreateIntegrationEndpointDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a crear',
    example:
      'Se proporciona un identificador de CreateIntegrationEndpoint a crear \(opcional\) ',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  // Constructor
  constructor(partial: Partial<CreateIntegrationEndpointDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<CreateIntegrationEndpointDto>): CreateIntegrationEndpointDto {
    const instance = new CreateIntegrationEndpointDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}



@InputType()
export class CreateOrUpdateIntegrationEndpointDto {
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
    type: () => CreateIntegrationEndpointDto,
    description: 'Instancia CreateIntegrationEndpoint o UpdateIntegrationEndpoint',
    nullable: true,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Field(() => CreateIntegrationEndpointDto, { nullable: true })
  input?: CreateIntegrationEndpointDto | UpdateIntegrationEndpointDto; // Asegúrate de que esto esté correcto
}



@InputType()
export class DeleteIntegrationEndpointDto {
  // Propiedades específicas de la clase DeleteIntegrationEndpointDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a eliminar',
    example: 'Se proporciona un identificador de DeleteIntegrationEndpoint a eliminar',
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
      'Se proporciona una lista de identificadores de DeleteIntegrationEndpoint a eliminar',
    default: [],
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  ids?: string[];
}



@InputType()
export class UpdateIntegrationEndpointDto extends BaseIntegrationEndpointDto {
  // Propiedades específicas de la clase UpdateIntegrationEndpointDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a actualizar',
    example: 'Se proporciona un identificador de UpdateIntegrationEndpoint a actualizar',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  id!: string;

  // Constructor
  constructor(partial: Partial<UpdateIntegrationEndpointDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<UpdateIntegrationEndpointDto>): UpdateIntegrationEndpointDto {
    const instance = new UpdateIntegrationEndpointDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
} 



