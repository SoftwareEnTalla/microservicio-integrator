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
export class BaseIntegrationRuntimePolicyDto {
  @ApiProperty({
    type: () => String,
    description: 'Nombre de instancia CreateIntegrationRuntimePolicy',
    example: 'Nombre de instancia CreateIntegrationRuntimePolicy',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  name: string = '';

  // Propiedades predeterminadas de la clase CreateIntegrationRuntimePolicyDto según especificación del sistema

  @ApiProperty({
    type: () => Date,
    description: 'Fecha de creación de la instancia (CreateIntegrationRuntimePolicy).',
    example: 'Fecha de creación de la instancia (CreateIntegrationRuntimePolicy).',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: () => Date,
    description: 'Fecha de actualización de la instancia (CreateIntegrationRuntimePolicy).',
    example: 'Fecha de actualización de la instancia (CreateIntegrationRuntimePolicy).',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: () => String,
    description:
      'Usuario que realiza la creación de la instancia (CreateIntegrationRuntimePolicy).',
    example:
      'Usuario que realiza la creación de la instancia (CreateIntegrationRuntimePolicy).',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdBy?: string; // Usuario que crea el objeto

  @ApiProperty({
    type: () => Boolean,
    description: 'Estado de activación de la instancia (CreateIntegrationRuntimePolicy).',
    example: 'Estado de activación de la instancia (CreateIntegrationRuntimePolicy).',
    nullable: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { nullable: false })
  isActive: boolean = false; // Por defecto, el objeto no está activo

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Integración propietaria de la política',
  })
  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, { description: 'Integración propietaria de la política', nullable: false })
  integratorId!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Estrategia de reintentos',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Estrategia de reintentos', nullable: false })
  retryStrategy!: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
    description: 'Máximo de reintentos',
  })
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, { description: 'Máximo de reintentos', nullable: false })
  maxRetries!: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
    description: 'Backoff entre reintentos',
  })
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, { description: 'Backoff entre reintentos', nullable: false })
  retryBackoffMs!: number;

  @ApiProperty({
    type: () => Number,
    nullable: true,
    description: 'Límite por minuto',
  })
  @IsInt()
  @IsOptional()
  @Field(() => Int, { description: 'Límite por minuto', nullable: true })
  rateLimitPerMinute?: number = 0;

  @ApiProperty({
    type: () => Number,
    nullable: false,
    description: 'Timeout general de la política',
  })
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, { description: 'Timeout general de la política', nullable: false })
  timeoutMs!: number;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Habilita circuit breaker',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Habilita circuit breaker', nullable: false })
  circuitBreakerEnabled!: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Ruta de healthcheck',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Ruta de healthcheck', nullable: true })
  healthCheckPath?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Canal de alertas',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Canal de alertas', nullable: true })
  alertChannel?: string = '';

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Metadatos adicionales de la política',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Metadatos adicionales de la política', nullable: true })
  metadata?: Record<string, any> = {};

  // Constructor
  constructor(partial: Partial<BaseIntegrationRuntimePolicyDto>) {
    Object.assign(this, partial);
  }
}




@InputType()
export class IntegrationRuntimePolicyDto extends BaseIntegrationRuntimePolicyDto {
  // Propiedades específicas de la clase IntegrationRuntimePolicyDto en cuestión

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
  constructor(partial: Partial<IntegrationRuntimePolicyDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<IntegrationRuntimePolicyDto>): IntegrationRuntimePolicyDto {
    const instance = new IntegrationRuntimePolicyDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
} 




@InputType()
export class IntegrationRuntimePolicyValueInput {
  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Campo de filtro',
  })
  @Field({ nullable: false })
  fieldName: string = 'id';

  @ApiProperty({
    type: () => IntegrationRuntimePolicyDto,
    nullable: false,
    description: 'Valor del filtro',
  })
  @Field(() => IntegrationRuntimePolicyDto, { nullable: false })
  fieldValue: any; // Permite cualquier tipo
} 




@ObjectType()
export class IntegrationRuntimePolicyOutPutDto extends BaseIntegrationRuntimePolicyDto {
  // Propiedades específicas de la clase IntegrationRuntimePolicyOutPutDto en cuestión

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
  constructor(partial: Partial<IntegrationRuntimePolicyOutPutDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<IntegrationRuntimePolicyOutPutDto>): IntegrationRuntimePolicyOutPutDto {
    const instance = new IntegrationRuntimePolicyOutPutDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}



@InputType()
export class CreateIntegrationRuntimePolicyDto extends BaseIntegrationRuntimePolicyDto {
  // Propiedades específicas de la clase CreateIntegrationRuntimePolicyDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a crear',
    example:
      'Se proporciona un identificador de CreateIntegrationRuntimePolicy a crear \(opcional\) ',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  // Constructor
  constructor(partial: Partial<CreateIntegrationRuntimePolicyDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<CreateIntegrationRuntimePolicyDto>): CreateIntegrationRuntimePolicyDto {
    const instance = new CreateIntegrationRuntimePolicyDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}



@InputType()
export class CreateOrUpdateIntegrationRuntimePolicyDto {
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
    type: () => CreateIntegrationRuntimePolicyDto,
    description: 'Instancia CreateIntegrationRuntimePolicy o UpdateIntegrationRuntimePolicy',
    nullable: true,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Field(() => CreateIntegrationRuntimePolicyDto, { nullable: true })
  input?: CreateIntegrationRuntimePolicyDto | UpdateIntegrationRuntimePolicyDto; // Asegúrate de que esto esté correcto
}



@InputType()
export class DeleteIntegrationRuntimePolicyDto {
  // Propiedades específicas de la clase DeleteIntegrationRuntimePolicyDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a eliminar',
    example: 'Se proporciona un identificador de DeleteIntegrationRuntimePolicy a eliminar',
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
      'Se proporciona una lista de identificadores de DeleteIntegrationRuntimePolicy a eliminar',
    default: [],
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  ids?: string[];
}



@InputType()
export class UpdateIntegrationRuntimePolicyDto extends BaseIntegrationRuntimePolicyDto {
  // Propiedades específicas de la clase UpdateIntegrationRuntimePolicyDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a actualizar',
    example: 'Se proporciona un identificador de UpdateIntegrationRuntimePolicy a actualizar',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  id!: string;

  // Constructor
  constructor(partial: Partial<UpdateIntegrationRuntimePolicyDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<UpdateIntegrationRuntimePolicyDto>): UpdateIntegrationRuntimePolicyDto {
    const instance = new UpdateIntegrationRuntimePolicyDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
} 



