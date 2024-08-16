#!/bin/bash

# Antes de usar, dar permisos de ejecución: chmod +x concatenate_files.sh    

# Nombres de los archivos del proyecto Next.js
files=(
    "src/app/page.tsx"
    "src/app/portfolio/page.tsx"
    "src/app/ClientLayout.tsx"
    "src/app/layout.tsx"
    "src/components/header.tsx"
    "src/components/header.module.css"
    "src/components/PdfViewer.tsx"
    "src/styles/globals.css"
    "src/utils/getPortfolio.ts"
)

# Archivo de salida
output_file="_combined.txt"

# Limpiar el archivo de salida si ya existe
> $output_file

# Concatenar los archivos
for file in "${files[@]}"
do
    cat "$file" >> $output_file
    echo "" >> $output_file # Agregar una línea en blanco entre archivos
done

echo "Files concatenated into $output_file"
