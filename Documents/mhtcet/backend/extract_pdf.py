import tabula
import pandas as pd

pdf_path = "2023ENGG_CAP3_AI_CutOff.pdf"
tables = tabula.read_pdf(pdf_path, pages="all", multiple_tables=True)
df = pd.concat(tables, ignore_index=True)
df.to_csv("cutoff_data.csv", index=False)
print("Extraction complete! Data saved to cutoff_data.csv") 