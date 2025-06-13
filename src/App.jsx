import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Code,
  Copy,
  Download,
  Eye,
  EyeOff,
  Package,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { CodeHighlighter } from "./CodeHighlighter";

const App = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [copiedCode, setCopiedCode] = useState(null);
  const [componentPreviews, setComponentPreviews] = useState({});

  // Enhanced components data with more examples and better organization
  const components = [
    {
      id: "button",
      name: "Button",
      description:
        "A versatile button component with multiple variants, sizes and states",
      category: "Form Controls",
      version: "2.1.0",
      props: [
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'outline' | 'ghost'",
          default: "primary",
          description: "Visual style variant",
        },
        {
          name: "size",
          type: "'sm' | 'md' | 'lg'",
          default: "md",
          description: "Button size",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable button interaction",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Show loading state",
        },
        {
          name: "icon",
          type: "ReactNode",
          default: "undefined",
          description: "Optional icon element",
        },
      ],
      examples: [
        {
          title: "Primary Button",
          description: "Default button style for primary actions",
          code: `<Button variant="primary" size="md">
  Primary Action
</Button>`,
          component: (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
              Primary Action
            </button>
          ),
        },
        {
          title: "Secondary Button",
          description: "Alternative button style for secondary actions",
          code: `<Button variant="secondary" size="md">
  Secondary Action
</Button>`,
          component: (
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border border-gray-300">
              Secondary Action
            </button>
          ),
        },
        {
          title: "Outline Button",
          description: "Outlined button variant for subtle actions",
          code: `<Button variant="outline" size="md">
  Outline Button
</Button>`,
          component: (
            <button className="bg-transparent hover:bg-blue-50 text-blue-600 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border-2 border-blue-600">
              Outline Button
            </button>
          ),
        },
      ],
    },
    {
      id: "card",
      name: "Card",
      description:
        "A flexible container component for grouping related content",
      category: "Layout",
      version: "1.8.2",
      props: [
        { name: "title", type: "string", description: "Card header title" },
        {
          name: "subtitle",
          type: "string",
          description: "Optional subtitle text",
        },
        {
          name: "shadow",
          type: "'none' | 'sm' | 'md' | 'lg'",
          default: "md",
          description: "Shadow depth",
        },
        {
          name: "padding",
          type: "'sm' | 'md' | 'lg'",
          default: "md",
          description: "Internal padding size",
        },
        {
          name: "hoverable",
          type: "boolean",
          default: "false",
          description: "Add hover effects",
        },
      ],
      examples: [
        {
          title: "Basic Card",
          description: "Simple card with title and content",
          code: `<Card title="Getting Started" shadow="md">
  <p>Welcome to our component library. This card demonstrates basic usage with clean typography and spacing.</p>
</Card>`,
          component: (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 max-w-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Getting Started
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Welcome to our component library. This card demonstrates basic
                usage with clean typography and spacing.
              </p>
            </div>
          ),
        },
        {
          title: "Interactive Card",
          description: "Card with hover effects and action buttons",
          code: `<Card title="Feature Highlight" hoverable>
  <p>This card includes hover effects and interactive elements.</p>
  <Button variant="primary" size="sm">Learn More</Button>
</Card>`,
          component: (
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 border border-gray-100 max-w-md transition-all duration-200 cursor-pointer">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Feature Highlight
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                This card includes hover effects and interactive elements.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Learn More
              </button>
            </div>
          ),
        },
      ],
    },
    {
      id: "modal",
      name: "Modal",
      description:
        "A modal dialog component with backdrop and focus management",
      category: "Overlays",
      version: "3.0.1",
      props: [
        {
          name: "isOpen",
          type: "boolean",
          description: "Controls modal visibility",
        },
        {
          name: "onClose",
          type: "() => void",
          description: "Close callback function",
        },
        { name: "title", type: "string", description: "Modal header title" },
        {
          name: "size",
          type: "'sm' | 'md' | 'lg' | 'xl'",
          default: "md",
          description: "Modal width size",
        },
        {
          name: "closeOnBackdrop",
          type: "boolean",
          default: "true",
          description: "Close when clicking backdrop",
        },
      ],
      examples: [
        {
          title: "Confirmation Modal",
          description: "Modal for confirming user actions",
          code: `<Modal 
  isOpen={showModal} 
  onClose={handleClose} 
  title="Confirm Action"
  size="sm"
>
  <p>Are you sure you want to proceed?</p>
  <div className="flex gap-2 mt-4">
    <Button variant="primary">Confirm</Button>
    <Button variant="secondary">Cancel</Button>
  </div>
</Modal>`,
          component: (
            <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirm Action
                </h3>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <span className="text-xl">×</span>
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                Are you sure you want to proceed?
              </p>
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Confirm
                </button>
                <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                  Cancel
                </button>
              </div>
              <div className="text-xs text-blue-500 mt-3 italic">
                Preview Mode
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: "input",
      name: "Input",
      description: "Form input component with validation and multiple states",
      category: "Form Controls",
      version: "2.3.0",
      props: [
        {
          name: "type",
          type: "'text' | 'email' | 'password' | 'number'",
          default: "text",
          description: "Input type",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text",
        },
        { name: "label", type: "string", description: "Input label" },
        {
          name: "error",
          type: "string",
          description: "Error message to display",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable input",
        },
      ],
      examples: [
        {
          title: "Text Input with Label",
          description: "Standard text input with floating label",
          code: `<Input 
  label="Email Address" 
  type="email" 
  placeholder="Enter your email" 
/>`,
          component: (
            <div className="max-w-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          ),
        },
      ],
    },
  ];

  const categories = [...new Set(components.map((comp) => comp.category))];

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const togglePreview = (componentId, exampleIndex) => {
    const key = `${componentId}-${exampleIndex}`;
    setComponentPreviews((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const copyCode = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Component Library
                </h1>
                <p className="text-gray-600 mt-1">
                  Modern React components for your next project
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4 mr-1" />
                v3.2.1
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Install
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-4 sm:p-6">
        <div className="flex gap-8">
          {/* Enhanced Sidebar */}
          <aside className="w-72 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 sticky top-32 border border-gray-200">
              <div className="flex items-center mb-6">
                <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Components</h3>
              </div>

              {categories.map((category) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                    {category}
                  </h4>
                  <ul className="space-y-1">
                    {components
                      .filter((comp) => comp.category === category)
                      .map((comp) => (
                        <li key={comp.id}>
                          <a
                            href={`#${comp.id}`}
                            className="group flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg transition-all duration-200"
                          >
                            <span className="font-medium">{comp.name}</span>
                            <span className="text-xs text-gray-400 group-hover:text-blue-400">
                              v{comp.version}
                            </span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Enhanced Main Content */}
          <main className="flex-1" style={{ width: "calc(100% - 20rem)" }}>
            {components.map((component) => (
              <section key={component.id} id={component.id} className="mb-16">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl  border border-gray-200 overflow-hidden">
                  {/* Enhanced Component Header */}
                  <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {component.name}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {component.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {component.category}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          v{component.version}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Props Documentation */}
                  <div className="p-8 border-b border-gray-100">
                    <button
                      onClick={() => toggleSection(`props-${component.id}`)}
                      className="flex items-center text-xl font-semibold text-gray-900 mb-6 hover:text-blue-600 transition-colors group"
                    >
                      {expandedSections[`props-${component.id}`] ? (
                        <ChevronDown className="w-6 h-6 mr-3 text-blue-600" />
                      ) : (
                        <ChevronRight className="w-6 h-6 mr-3 group-hover:text-blue-600" />
                      )}
                      Props & API
                    </button>

                    {expandedSections[`props-${component.id}`] && (
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-2 font-semibold text-gray-800">
                                  Property
                                </th>
                                <th className="text-left py-3 px-2 font-semibold text-gray-800">
                                  Type
                                </th>
                                <th className="text-left py-3 px-2 font-semibold text-gray-800">
                                  Default
                                </th>
                                <th className="text-left py-3 px-2 font-semibold text-gray-800">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {component.props.map((prop, index) => (
                                <tr
                                  key={prop.name}
                                  className={`border-b border-gray-100 ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  }`}
                                >
                                  <td className="py-3 px-2 font-mono text-blue-600 font-medium">
                                    {prop.name}
                                  </td>
                                  <td className="py-3 px-2 font-mono text-sm text-purple-600 bg-purple-50 rounded px-2">
                                    {prop.type}
                                  </td>
                                  <td className="py-3 px-2 font-mono text-sm text-gray-500">
                                    {prop.default || "—"}
                                  </td>
                                  <td className="py-3 px-2 text-gray-700">
                                    {prop.description}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Examples Section */}
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-8 flex items-center">
                      <Code className="w-5 h-5 mr-2 text-blue-600" />
                      Examples & Usage
                    </h3>

                    {component.examples.map((example, index) => {
                      const previewKey = `${component.id}-${index}`;
                      const showPreview = componentPreviews[previewKey];

                      return (
                        <div key={index} className="mb-10 last:mb-0">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                {example.title}
                              </h4>
                              {example.description && (
                                <p className="text-gray-600 text-sm">
                                  {example.description}
                                </p>
                              )}
                            </div>

                            <button
                              onClick={() => togglePreview(component.id, index)}
                              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                showPreview
                                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {showPreview ? (
                                <>
                                  <EyeOff className="w-4 h-4 mr-2" />
                                  Hide Preview
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Show Preview
                                </>
                              )}
                            </button>
                          </div>

                          {/* Code Block */}
                          <div className="relative mb-4">
                            <CodeHighlighter code={example.code} />
                            <button
                              onClick={() =>
                                copyCode(
                                  example.code,
                                  `${component.id}-${index}`
                                )
                              }
                              className="absolute top-3 right-3 p-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                              title="Copy code"
                            >
                              {copiedCode === `${component.id}-${index}` ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {/* Preview Section */}
                          {showPreview && (
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 bg-white">
                              <div className="flex justify-center items-center min-h-[100px]">
                                {example.component}
                              </div>
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-center text-xs text-gray-500">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Live Preview
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Download className="w-5 h-5 mr-2 text-blue-600" />
                Installation
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative group">
                <code className="text-sm">
                  npm install @yourorg/ui-components
                </code>
                <button
                  onClick={() =>
                    copyCode("npm install @yourorg/ui-components", "install")
                  }
                  className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedCode === "install" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-600" />
                Import Components
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative group">
                <code className="text-sm">{`import { Button, Card, Modal } from '@yourorg/ui-components';`}</code>
                <button
                  onClick={() =>
                    copyCode(
                      `import { Button, Card, Modal } from '@yourorg/ui-components';`,
                      "import"
                    )
                  }
                  className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedCode === "import" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Contributing Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            Built with ❤️ for developers • Last updated: June 2025
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
