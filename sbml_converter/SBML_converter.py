import xml.dom.minidom
import json
import os
from tkinter import *
from tkinter import filedialog


'''
Reads metabolites from the SBML file and returns a dictionnary
'''
def getMetabolites(doc):
    species = doc.getElementsByTagName("species")
    metabolites = []
    for sp in species:
        metabolite ={}
        metabolite["id"] = sp.getAttribute("id")
        metabolite["name"] = sp.getAttribute("name")
        metabolite["compartment"]=sp.getAttribute("compartment")
        metabolite["charge"]=sp.getAttribute("fbc:charge")
        metabolite["formula"]=sp.getAttribute("fbc:chemicalFormula")
        metabolites.append(metabolite)
    return metabolites

'''
Reads products from the SBML file and returns a dictionnary
'''
def getProducts(products_list):
    final_products = {}
    for prod in products_list:
        products = prod.getElementsByTagName("speciesReference")
        for p in products:
            final_products[p.getAttribute("species")]=float(p.getAttribute("stoichiometry"))
    return final_products


'''
Reads reactants from the SBML file and returns a dictionnary
'''
def getReactants(reactants_list):
    final_reactants = {}
    for react in reactants_list:
        reactants = react.getElementsByTagName("speciesReference")
        for r in reactants:
            stoichio = - float(r.getAttribute("stoichiometry"))
            final_reactants[r.getAttribute("species")] = stoichio
    return final_reactants


'''
Reads reactions from the SBML file 
Calls functions getProducts() and getReactants() 
to deal with stoichiometry
Returns a dictionnary
'''        
def getReactions(doc):
    reacts = doc.getElementsByTagName("reaction")
    reactions = []
    for re in reacts:
        reaction = {}
        products_list = re.getElementsByTagName("listOfProducts")
        products = getProducts(products_list)
        reactants_list = re.getElementsByTagName("listOfReactants")
        reactants = getReactants(reactants_list)
        reactants.update(products)
        reaction["id"] =  re.getAttribute("id")
        reaction["name"] = re.getAttribute("name")
        reaction["metabolites"] = reactants
        #reaction["lower_bound"]= re.getAttribute("fbc:lowerFluxBound")
        #reaction["upper_bound"]=re.getAttribute("fbc:upperFluxBound")
        #reaction["gene_reaction_rule"]=
        #reaction["subsystem"]=
        reactions.append(reaction)
    return reactions

'''
Reads compartments from the SBML file and returns a dictionnary
'''

def getCompartments(doc):
    comparts= doc.getElementsByTagName("compartment")
    compartments = {}
    for comp in comparts:
        compartments[comp.getAttribute("id")] = comp.getAttribute("name")
    return compartments

'''
Calls all reading functions and builds a json type variable
'''
def createJSON(doc):
    json ={} 
    metabolites = getMetabolites(doc)
    reactions = getReactions(doc)
    compartments = getCompartments(doc)
    json["metabolites"] = metabolites
    json["reactions"]=reactions
    json["id"] = doc.getElementsByTagName("model")[0].getAttribute("id")
    json["compartments"] = compartments
    json["version"]= "1"

    return json

'''
On click, allows the user to select a SBML file
Creates a directory for the converted file (if it doesn't exist)
Reads the SBML file and saves a JSON file in the directory.

'''

def Upload(event=None):
    filename = filedialog.askopenfilename()
    print('Selected:', filename)
    doc = xml.dom.minidom.parse(filename)
    json_file = createJSON(doc)
    fileName = json_file["id"] + ".json"
    path = "converted_files"
    try:
        os.mkdir(path)
    except OSError:
        print ("Creation of the directory %s failed, already exists")
    file_to_open = "converted_files/"+fileName
    with open (file_to_open,'w') as outfile:
        json.dump(json_file,outfile)


# -------  GRAPHIC PART --------#

root = Tk()
root.title ("Convertisseur SBML vers JSON")
root.minsize(250,100)
root.config(background = '#d2dbd7')
main_frame = Frame(root)
main_frame.pack()
label = Label(main_frame,background = '#d2dbd7',text="Importez votre fichier SBML",font=("Helvetica",18))
label.pack()
choice_button = Button(root,text = "Choisir un fichier",command=Upload)
choice_button.pack()


root.mainloop()



#MAIN

