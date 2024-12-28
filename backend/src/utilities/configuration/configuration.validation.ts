import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsNumberString,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

// Define the class that will be used to validate the configuration
class EnvironmentVariables {
  @IsDefined()
  @IsNumberString()
  @MinLength(4)
  PORT: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_URL: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  JWT_SECRET: string;
}

// Function to validate the configuration object
export function validateConfig(configuration: Record<string, unknown>) {
  // Convert plain object to class instance with implicit conversion enabled
  const finalConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  // Validate the class instance and collect validation errors
  const errors = validateSync(finalConfig, {
    skipMissingProperties: false,
  });

  // Log each validation error to the console
  let index = 0;
  for (const err of errors) {
    Object.values(err.constraints).forEach((str) => {
      ++index;
      console.error(`Error ${index}: ${str}`);
    });
    console.log('\n ***** \n');
  }

  // Throw an error if there are validation errors
  if (errors.length) {
    throw new Error('Environment Configuration validation failed');
  }

  // Return the validated configuration
  return finalConfig;
}
