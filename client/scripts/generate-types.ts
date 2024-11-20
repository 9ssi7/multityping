import { compile, Options } from "json-schema-to-typescript";
import * as fs from "fs/promises";
import * as path from "path";

const options : Partial<Options> = {
  additionalProperties: false,
  strictIndexSignatures: true,
}

async function generateTypesForAllJsonSchemas(folderPath: string, outputFolderPath: string) {
  try {
    const files = await fs.readdir(folderPath);
    
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    if (jsonFiles.length === 0) {
      console.log("No JSON files found in the folder.");
      return;
    }

    await fs.mkdir(outputFolderPath, { recursive: true });

    for (const jsonFile of jsonFiles) {
      const schemaPath = path.join(folderPath, jsonFile);
      const schemaContent = await fs.readFile(schemaPath, "utf-8");
      const schema = JSON.parse(schemaContent);
      schema.additionalProperties = false;

      const baseName = path.basename(jsonFile, ".json");
      const outputTsPath = path.join(outputFolderPath, `${baseName}.d.ts`);

      const ts = await compile(schema, baseName, options);
      await fs.writeFile(outputTsPath, ts);

      console.log(`TypeScript types for ${jsonFile} generated at ${outputTsPath}`);
    }
  } catch (error) {
    console.error("An error occurred while generating TypeScript types:", error);
  }
}

async function main() {
  const inputFolder = "./schemas"; 
  const outputFolder = "./types"; 

  await generateTypesForAllJsonSchemas(inputFolder, outputFolder);
}

main().catch(console.error);
